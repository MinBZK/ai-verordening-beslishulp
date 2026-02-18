function metrics(r) {
    r.subrequest('/stub_status', function(res) {
        var lines = res.responseText.split('\n');
        var active = lines[0].split(': ')[1];
        var accepts_handled_requests = lines[2].trim().split(/\s+/);
        var reading_writing_waiting = lines[3].match(/\d+/g);

        r.headersOut['Content-Type'] = 'text/plain';
        r.return(200,
            '# HELP nginx_connections_active Active client connections\n' +
            '# TYPE nginx_connections_active gauge\n' +
            'nginx_connections_active ' + active + '\n' +
            '# HELP nginx_connections_accepted Total accepted connections\n' +
            '# TYPE nginx_connections_accepted counter\n' +
            'nginx_connections_accepted ' + accepts_handled_requests[0] + '\n' +
            '# HELP nginx_connections_handled Total handled connections\n' +
            '# TYPE nginx_connections_handled counter\n' +
            'nginx_connections_handled ' + accepts_handled_requests[1] + '\n' +
            '# HELP nginx_http_requests_total Total HTTP requests\n' +
            '# TYPE nginx_http_requests_total counter\n' +
            'nginx_http_requests_total ' + accepts_handled_requests[2] + '\n' +
            '# HELP nginx_connections_reading Connections reading request\n' +
            '# TYPE nginx_connections_reading gauge\n' +
            'nginx_connections_reading ' + reading_writing_waiting[0] + '\n' +
            '# HELP nginx_connections_writing Connections writing response\n' +
            '# TYPE nginx_connections_writing gauge\n' +
            'nginx_connections_writing ' + reading_writing_waiting[1] + '\n' +
            '# HELP nginx_connections_waiting Idle connections\n' +
            '# TYPE nginx_connections_waiting gauge\n' +
            'nginx_connections_waiting ' + reading_writing_waiting[2] + '\n'
        );
    });
}

export default { metrics };
