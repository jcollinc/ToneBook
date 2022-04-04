class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.belongs_to :routine, null: false, foreign_key: true
      t.string :name
      t.integer :bpm
      t.string :description
      t.string :video_url
      t.boolean :is_private

      t.timestamps
    end
  end
end
