# app/services/application_service.rb
class ApplicationService
  def self.call(*args, &block)
    new(&block).call
  end
end
