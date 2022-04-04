class CreateRoutines < ActiveRecord::Migration[6.1]
  def change
    create_table :routines do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name
      t.string :description
      t.string :image

      t.timestamps
    end
  end
end
