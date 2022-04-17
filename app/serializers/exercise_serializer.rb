class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :bpm, :description, :video_url, :notes, :routine_id, :is_private
  has_one :routine
end
