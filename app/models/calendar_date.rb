class CalendarDate < ApplicationRecord
  validates :date, uniqueness: {scope: :user_id}

  belongs_to :user
end
