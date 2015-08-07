class Users::RegistrationsController < Devise::RegistrationsController
# before_filter :configure_sign_up_params, only: [:create]
# before_filter :configure_account_update_params, only: [:update]
  # GET /resource/sign_up
  def new
    @user = User.new
    @flavors = Flavor.all
  end

  # POST /resource
  def create
    if User.where(email: params[:user_email]).length == 0
      
      @user = User.create(email: params[:user_email],
                password: params[:user_password],
                password_confirmation: params[:user_password_confirmation],
                likes: params[:feedback],
                dislikes: params[:dislike_feedback])

      params[:packages_selected].each do |preference|
        Preference.create(user_id: @user.id,
                          name: preference)
      end
      sign_in(@user)
      render "memberships/new"
    else
      render :error #render some fail messaging html
    end
    
  end

  # GET /resource/edit
  def edit
    super
  end

  # PUT /resource
  def update
    super
  end

  # DELETE /resource
  def destroy
    super
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  def cancel
    super
  end

    protected

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_sign_up_params
    #   devise_parameter_sanitizer.for(:sign_up) << :attribute
    # end

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_account_update_params
    #   devise_parameter_sanitizer.for(:account_update) << :attribute
    # end

    # The path used after sign up.
    # def after_sign_up_path_for(resource)
    #   super(resource)
    # end

    # The path used after sign up for inactive accounts.
    # def after_inactive_sign_up_path_for(resource)
    #   super(resource)
    # end
end
