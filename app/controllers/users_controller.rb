class UsersController < ApplicationController

  def index
    @users = User.where.not(role: '1')
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    @user.password = '123450'
    @newuser = @user.save
    if @newuser
      respond_to do |format|
        UserMailer.with(user: @user, type: 'Created').user_info.deliver_later
        format.html { 
          redirect_to(@user, notice: (t 'form.create_success')) 
        }
      end
    else
      render 'new'
    end
  end

  def update
    @user = User.find(params[:id])
      if @user.update(user_params)
        respond_to do |format|
          UserMailer.with(user: @user, type: 'Updated').user_info.deliver_later
          format.html { 
            redirect_to(@user, notice: (t 'form.update_success')) 
          }
        end
      else
        render 'edit'
      end
  end

  def destroy
    @user = User.find(params[:id])
    UserMailer.with(user: @user, type: 'Deleted').user_info.deliver_later
    @user.destroy
    redirect_to users_path
  end

  private
  def user_params
    params.require(:user).permit(:firstname, :lastname, :username, :email, :age, :avatar)
  end
end
