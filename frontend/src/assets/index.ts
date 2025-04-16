type FontRegistry = {
  [key: string]: string | Promise<string>;
};

export const _assetRegistry: FontRegistry = {};

// Cache for development mode encoded assets
const _encodedCache: Record<string, string> = {};
const _filePaths: Record<string, string> = {};
const _pendingFetches: Record<string, Promise<string>> = {};

const _fontModules = import.meta.glob(['./fonts/**.ttf'], {
  eager: true,
  query: '?url',
  import: 'default'
});

const _isDevelopment = (url: string) => {
  return url.startsWith('/');
};

async function _fetchAndEncode(url: string): Promise<string> {
  // Return from cache if available
  if (_encodedCache[url]) {
    return _encodedCache[url];
  }

  // Return existing promise if there's already a fetch in progress
  const pendingFetch = _pendingFetches[url];
  if (pendingFetch) {
    return pendingFetch;
  }

  // Start a new fetch and cache the promise
  const fetchPromise = new Promise<string>(async (resolve) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64Data = dataUrl.split(',')[1];
        _encodedCache[url] = base64Data;
        delete _pendingFetches[url];
        resolve(base64Data);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error(`Failed to fetch and encode asset: ${url}`, error);
      delete _pendingFetches[url];
      resolve(''); // Return empty string on error
    }
  });
  _pendingFetches[url] = fetchPromise;
  return fetchPromise;
}

Object.entries(_fontModules).forEach(([path, url]) => {
  const filename = path.split('/').pop() || '';
  if (_isDevelopment(url as string)) {
    _filePaths[filename] = url as string;
    _assetRegistry[filename] = url as string;
  } else {
    _assetRegistry[filename] = url as string;
  }
});

export async function getAsset(filename: string): Promise<string | undefined> {
  const asset = _assetRegistry[filename];
  if (!asset) return undefined;
  if (_isDevelopment(asset as string)) {
    const path = _filePaths[filename];
    if (!path) return undefined;
    if (_encodedCache[path]) {
      return _encodedCache[path];
    }
    const base64 = await _fetchAndEncode(path);
    _assetRegistry[filename] = base64;
    return base64;
  }
  return (<string>asset).split(',')[1];
}
