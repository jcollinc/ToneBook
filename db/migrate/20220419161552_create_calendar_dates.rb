class CreateCalendarDates < ActiveRecord::Migration[6.1]
  def change
    create_table :calendar_dates do |t|
      t.string :date
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
