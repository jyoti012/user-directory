class UserMailer < ApplicationMailer

  default from: 'archangel.test07@gmail.com'
  default to: 'archangel.test07+01@gmail.com'

  def user_info
    @user = params[:user]
    @subject = 'User: ' + @user.firstname + ' ' + @user.lastname + ' ' + params[:type]
    mail(subject: @subject)
  end
end
