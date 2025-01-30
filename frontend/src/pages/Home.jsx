import React, { useState, useEffect } from "react";
import {
  FaRegLightbulb,
  FaUsers,
  FaTrophy,
  FaBriefcase,
  FaBars,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // Importe a imagem do logo (coloque a imagem na pasta assets)

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Função para alternar entre modo claro e escuro
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Função para abrir/fechar o menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Função para verificar se o usuário rolou para baixo
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Hook para adicionar o listener de scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } transition-all duration-300`}
    >
      {/* Header/Menu */}
      <header
        className={`fixed w-full top-0 left-0 p-4 flex justify-between items-center z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white text-gray-900 shadow-lg"
            : "bg-opacity-0 text-white"
        }`}
      >
        <div className="text-3xl font-bold text-blue-400 hover:text-blue-500 transition-all duration-300">
          {/* Logo como imagem */}
          <img
            src={logo}
            alt="TaskManager Logo"
            className="h-20 w-auto font-bold" // Ajuste o tamanho conforme necessário
          />
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-black">
            {menuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>
        <nav
          className={`lg:flex space-x-8 ${
            menuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <a
            href="#login"
            className="text-lg hover:text-blue-400 transition-all"
          >
            Login
          </a>
          <a
            href="#signup"
            className="text-lg hover:text-blue-400 transition-all"
          >
            Criar Conta
          </a>
          <a
            href="#about"
            className="text-lg hover:text-blue-400 transition-all"
          >
            Sobre
          </a>
        </nav>
      </header>

      {/* Main Section */}
      <main>
        {/* Banner */}
        <section className="flex flex-col items-center justify-center relative h-screen">
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 text-center text-white items-center mt-80">
              <h1 className="text-6xl font-extrabold animate__animated animate__fadeIn">
                Gerencie suas Tarefas com Facilidade
              </h1>
              <p className="text-lg mt-6 animate__animated animate__fadeIn animate__delay-1s">
                Organize seu trabalho e aumente a produtividade com a melhor
                ferramenta de gerenciamento de tarefas.
              </p>
              <button className="mt-8 px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-all">
                Comece Agora
              </button>
            </div>
          </div>
        </section>

        {/* Missão, Visão e Valores */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          {/* Missão */}
          <div className="space-y-6 text-center p-8 bg-gray-100 rounded-xl shadow-lg transition-all hover:shadow-2xl">
            <FaRegLightbulb className="text-5xl text-blue-500 mb-6" />
            <h3 className="text-3xl font-semibold">Missão</h3>
            <p className="text-lg">
              Nossa missão é oferecer uma solução inovadora e eficiente para a
              organização e colaboração de equipes, ajudando a alcançar
              resultados excepcionais.
            </p>
          </div>

          {/* Visão */}
          <div className="space-y-6 text-center p-8 bg-gray-100 rounded-xl shadow-lg transition-all hover:shadow-2xl">
            <FaTrophy className="text-5xl text-yellow-500 mb-6" />
            <h3 className="text-3xl font-semibold">Visão</h3>
            <p className="text-lg">
              Queremos ser a plataforma de gerenciamento de tarefas mais
              confiável do mundo, oferecendo soluções dinâmicas e eficientes
              para equipes de todos os tamanhos.
            </p>
          </div>

          {/* Valores */}
          <div className="space-y-6 text-center p-8 bg-gray-100 rounded-xl shadow-lg transition-all hover:shadow-2xl">
            <FaUsers className="text-5xl text-green-500 mb-6" />
            <h3 className="text-3xl font-semibold">Valores</h3>
            <ul className="list-disc list-inside text-lg space-y-4">
              <li>
                <strong>Comprometimento:</strong> Apoiamos o sucesso de nossos
                usuários com dedicação.
              </li>
              <li>
                <strong>Inovação:</strong> Buscamos constantemente novas ideias
                e melhorias.
              </li>
              <li>
                <strong>Colaboração:</strong> Valorizamos o trabalho em equipe e
                a troca de ideias.
              </li>
            </ul>
          </div>
        </section>

        {/* Público-Alvo */}
        <section id="target-audience" className="space-y-8 py-16 bg-gray-50">
          <h2 className="text-4xl font-semibold text-center">Público-Alvo</h2>
          <p className="text-lg text-center max-w-2xl mx-auto">
            Nosso aplicativo é ideal para equipes de trabalho, freelancers,
            empreendedores e estudantes que buscam uma maneira prática e eficaz
            de organizar suas tarefas com colaboração em tempo real.
          </p>
        </section>

        {/* Como Funciona */}
        <section id="how-it-works" className="space-y-12 py-16 bg-gray-50">
          <h2 className="text-4xl font-semibold text-center">Como Funciona?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <FaBriefcase className="text-5xl text-blue-500 mb-6" />
              <h3 className="text-2xl font-semibold">Crie Projetos</h3>
              <p className="mt-4">
                Inicie projetos e organize suas tarefas em etapas claras e
                objetivas.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <FaUsers className="text-5xl text-green-500 mb-6" />
              <h3 className="text-2xl font-semibold">Colabore</h3>
              <p className="mt-4">
                Trabalhe em equipe, atribuindo tarefas e acompanhando o
                progresso em tempo real.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all">
              <FaTrophy className="text-5xl text-yellow-500 mb-6" />
              <h3 className="text-2xl font-semibold">Acompanhe o Progresso</h3>
              <p className="mt-4">
                Monitore o andamento das tarefas e celebre cada conquista
                alcançada.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray text-white text-center py-12 mt-16 shadow-lg">
          <div className="container mx-auto px-6">
            {/* Redes Sociais */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">
                Siga-nos nas redes sociais
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-white text-3xl hover:text-blue-500 transition-all" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-white text-3xl hover:text-blue-400 transition-all" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-white text-3xl hover:text-pink-500 transition-all" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-white text-3xl hover:text-blue-700 transition-all" />
                </a>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Fale Conosco</h3>
              <form className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="w-full p-3 text-black rounded-md"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="w-full p-3 text-black rounded-md"
                />
                <textarea
                  placeholder="Sua mensagem"
                  className="w-full p-3 text-black rounded-md"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-300 transition-all"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div className="text-lg">
              <p>📍 Endereço: Rua Exemplo, 123, Cidade, País</p>
              <p>📧 E-mail: contato@taskmanager.com</p>
              <p>📞 Telefone: (11) 1234-5678</p>
            </div>

            {/* Direitos Autorais */}
            <div className="mt-8">
              <p>© 2025 TaskManager | Todos os direitos reservados</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default HomePage;
