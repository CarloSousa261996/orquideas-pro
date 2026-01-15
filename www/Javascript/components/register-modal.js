/**
 * Cria um elemento modal para registrar um novo usuário.
 * O modal contém um formulário com campos de entrada para nome de usuário, email, senha e termos e condições.
 * Quando o formulário é enviado, os dados são registrados no console.
 * O modal pode ser fechado clicando no botão fechar ou clicando fora do modal.
 * @returns {HTMLElement} Um elemento modal com o formulário de registro.
 */
export const RegisterModal = () => {
  const modal = document.createElement("div");
  modal.classList.add("modal-register");
  modal.id = "registerModal";

  modal.innerHTML = `
    <div class="register-container">
      <button class="close-btn">&times;</button>
      <h2>Register</h2>
      
      <form id="registerForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Username"
            required
          />
          <i class="fa-solid fa-user icon"></i>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Email"
            required
          />
          <i class="fa-solid fa-envelope icon"></i>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Password"
            required
          />
          <i class="fa-solid fa-lock icon"></i>
        </div>

        <div class="checkbox-group">
          <input 
            type="checkbox" 
            id="terms" 
            name="terms"
            required
          />
          <label for="terms">Agree to terms & conditions</label>
        </div>

        <button type="submit" class="register-btn">Register</button>
      </form>

      <div class="login-link">
        Already have an account? <a href="#login">Login</a>
      </div>
    </div>
  `;

  // Close button functionality
  const closeBtn = modal.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Form submit
  const form = modal.querySelector("#registerForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log("Register data:", Object.fromEntries(formData));
    // Here you would typically send data to a backend
    modal.classList.add("hidden");
  });

  return modal;
};

export default RegisterModal;
