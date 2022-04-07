class RoutinesController < ApplicationController

  def index  
    render json: current_user.routines
  end
  
  def create 
    routine = Routine.create(routine_params)
    if routine.valid?
      render json: routine, status: :created
    else
      render json: { errors: routine.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update  
    routine = Routine.find(params[:id])
    routine.update!(routine_params)
    render json: routine, status: 200
  end

  def destroy
    routine = Routine.find(params[:id])
    routine.destroy 
    head :no_content, status: :deleted
  end

  private

  def routine_params
      params.permit(:user_id, :name, :description, :image)
  end

end
