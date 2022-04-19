class CalendarSerializer < ActiveModel::Serializer
  attributes :id, :date, :count
  has_one :user
end
