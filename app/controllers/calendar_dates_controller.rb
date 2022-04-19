class CalendarDatesController < ApplicationController

  def index  
    render json: current_user.calendar_dates
  end

  def create 
    calendar_date = CalendarDate.create(calendar_params)
    if calendar_date.valid?
      render json: calendar_date, status: :created
    else
      render json: { errors: calendar_date.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update  
    calendar_date = CalendarDate.find(params[:id])
    calendar_date.update!(calendar_params)
    render json: calendar_date, status: 200
  end

  private

  def calendar_params
      params.permit(:user_id, :date)
  end

end
