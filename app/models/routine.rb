class Routine < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :exercises, dependent: :destroy
end
