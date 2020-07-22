class UsersController < ApplicationController

  # def index
  #   @users = User.where.not(role: '1')
  #   render json: {
  #     :users => @users
  #   }.to_json
  # end

  def index
    if user_signed_in?
      @users = User.where.not(role: '1')
      render json: {
        :users => @users
      }.to_json
    else
      render json: {}, status: 401
    end
  end

  def show
    @user = User.find(params[:id])
    render json: {
      :user => @user
    }.to_json
  end

  def new
    @user = User.new
  end

  def edit
    @user = User.find(params[:id])
    render json: {
      :user => @user
    }.to_json
  end

  def create
    if user_signed_in?
      @user = User.new(user_params)
        @user.password = '123450'
        @newuser = @user.save
      if @newuser
          UserMailer.with(user: @user, type: 'Created').user_info.deliver_later
          render json: {
            :user => @user,
            :status => 'success'
          }.to_json, status: 200
      else
        render json: {
          :errors => @user.errors,
          :status => 'error'
          }, status: 400
      end
    else
      render json: {}, status: 401
    end
  end

  def update
    if user_signed_in?
      @user = User.find(params[:id])
      if @user.update(user_params)
          UserMailer.with(user: @user, type: 'Updated').user_info.deliver_later
          render json: {
            :user => @user,
            :status => 'success'
          }.to_json, status: 200
      else
        render json: {
          :errors => @user.errors,
          :status => 'error'
          }, status: 400
      end
    else
      render json: {}, status: 401
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
    params.require(:user).permit(:firstname, :lastname, :username, :email, :age, :avatar, :id)
  end
end
