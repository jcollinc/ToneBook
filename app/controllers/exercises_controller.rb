class ExercisesController < ApplicationController

  def index  
    render json: current_user.exercises
  end

  def create 
    exercise = Exercise.create(exercise_params)
    if exercise.valid?
      render json: exercise, status: :created
    else
      render json: { errors: exercise.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update  
    exercise = Exercise.find(params[:id])
    exercise.update!(exercise_params)
    render json: exercise, status: 200
  end

  def destroy
    exercise = Exercise.find(params[:id])
    exercise.destroy 
    head :no_content, status: :deleted
  end

  private

  def exercise_params
      params.permit(:routine_id, :name, :description, :bpm, :notes, :video_url, :is_private)
  end

end


