export default function WelcomeClient() {
  return localStorage.getItem("token") && <div>WelcomeClient</div>;
}
