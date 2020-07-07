class ChangeDataTypeAge < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :age, :integer
  end
end
