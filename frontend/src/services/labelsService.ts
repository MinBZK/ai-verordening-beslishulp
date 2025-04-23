/**
 * Service for handling label operations
 */

// Type definitions
export interface LabelItem {
  category: string
  assigned_labels: string | string[] | undefined
}

export interface FilteredLabels {
  [category: string]: string[]
}

/**
 * Filters and processes labels to ensure they're in the correct format
 * and excludes labels like 'niet van toepassing' and 'nader te bepalen'
 *
 * @param labels The raw labels to filter
 * @returns An object with categories as keys and arrays of valid labels as values
 */
export function filterLabels(labels: LabelItem[] | undefined): FilteredLabels {
  const filtered: FilteredLabels = {}

  if (!labels || typeof labels !== 'object') {
    return filtered
  }

  const entries = Array.isArray(labels)
    ? labels
    : Object.entries(labels).map(([category, assigned_labels]) => ({
        category,
        assigned_labels
      }))

  entries.forEach((item) => {
    if (item.assigned_labels && typeof item.assigned_labels === 'string') {
      const validLabels = item.assigned_labels
        .split(',')
        .filter((label) => label !== 'niet van toepassing' && label !== 'nader te bepalen')

      if (validLabels.length > 0) {
        filtered[item.category] = validLabels
      }
    } else if (Array.isArray(item.assigned_labels)) {
      const validLabels = item.assigned_labels.filter(
        (label) => label !== 'niet van toepassing' && label !== 'nader te bepalen'
      )

      if (validLabels.length > 0) {
        filtered[item.category] = validLabels
      }
    }
  })
  return filtered
}
