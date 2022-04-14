class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :bpm, :description, :video_url, :image, :routine_id, :is_private
  has_one :routine
end
