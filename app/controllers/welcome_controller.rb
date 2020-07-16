class WelcomeController < ApplicationController
  before_action :authenticate_user!, only: [ :add, :edit, :view]
  def home
  end

  def add
  end

  def edit
  end

  def view
  end
end
