class Itinerary < ActiveRecord::Base
  has_many :itinerary_places
  has_many :places, through: :itinerary_places
  has_many :likes
  belongs_to :user
  accepts_nested_attributes_for :user

  validates :name, presence: true
  validates :description, presence: true
  #validates :password, presence: true

  validates_uniqueness_of :name
end
