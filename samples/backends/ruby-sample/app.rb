require 'sinatra'
require 'json'
require 'sinatra/cross_origin'
require 'trustcaptcha/captcha_manager'

set :port, 8080
set :bind, '0.0.0.0'

configure do
  enable :cross_origin
end

options '*' do
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, Origin, Accept'
  200
end

post '/api/example' do
  content_type :json
  response.headers['Access-Control-Allow-Origin'] = '*'
  verification_token = JSON.parse(request.body.read)['verificationToken']

  # Retrieving the verification result
  begin
    verification_result = CaptchaManager.get_verification_result('<your_secret_key>', verification_token)
  rescue StandardError => e
    # Fetch verification result failed - handle error
    puts "Failed to fetch verification result: #{e.class} - #{e.message}"
    status 500
    return { error: 'Captcha verification failed', message: e.message }.to_json
  end

  # Do something with the verification result
  if !verification_result.verification_passed || verification_result.score > 0.5
    puts 'Verification failed or bot score > 0.5 – possible automated request.'
  end

  verification_result.to_json
end
