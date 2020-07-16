class UserMailer < ApplicationMailer

  default from: ENV['MAILER_EMAIL']
  default to: ENV['MAILER_EMAIL_TO']

  def user_info
    @user = params[:user]
    @subject = 'User: ' + @user.firstname + ' ' + @user.lastname + ' ' + params[:type]
    mail(subject: @subject)
  end
end
