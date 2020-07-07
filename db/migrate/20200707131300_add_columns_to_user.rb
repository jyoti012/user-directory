class AddColumnsToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :string
    add_index :users, :reset_password_token, unique: true
  end
end
