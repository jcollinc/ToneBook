class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :bpm, :description, :video_url, :image, :is_private
  has_one :routine
  has_one :user
end
