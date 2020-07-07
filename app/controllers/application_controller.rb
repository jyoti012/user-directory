class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  around_action :switch_locale
  before_action :authenticate_user!
  before_action :set_locale

  def home; end
 
  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  private

  def set_locale
    @locale ||= params[:locale] || session[:locale] || I18n.default_locale
    I18n.locale = session[:locale] = @locale
  end

end