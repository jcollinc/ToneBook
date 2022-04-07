class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image
  has_one :user
  has_many :exercises
end
