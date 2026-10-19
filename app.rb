require 'sinatra'

set :bind, '0.0.0.0'
set :port, Integer(ENV.fetch('PORT', '4567'))
set :host_authorization, { permitted_hosts: [] }

get('/health') { 'ok' }
get('/') { "<h1>fixture ruby-sinatra OK</h1><p>message: #{ENV['FIXTURE_MESSAGE'] || '(unset)'}</p>" }
