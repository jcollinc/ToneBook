class CreateCalendars < ActiveRecord::Migration[6.1]
  def change
    create_table :calendars do |t|
      t.string :date
      t.integer :count
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
