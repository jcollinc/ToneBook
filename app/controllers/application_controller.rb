class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid

  private 

  def render_invalid(e)
    render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
  end 

  def render_not_found()
      render json: {error: "Not Found"}, status: :not_found
  end 

end
