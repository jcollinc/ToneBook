class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :bpm, :description, :video_url, :is_private
  has_one :routine
end
