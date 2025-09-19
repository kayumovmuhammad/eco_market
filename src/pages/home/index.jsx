import { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router';

function useCountUp(end, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const target = typeof end === 'number' ? end : parseInt(String(end).replace(/\s/g, ''), 10) || 0;
    let startTime = null;
    let rafId = null;
    const step = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, duration]);
  return value;
}

function formatNumber(n) {
  return n.toLocaleString('ru-RU');
}

function Metric({ end, label }) {
  const value = useCountUp(end, 1100);
  return (
    <div className="metric">
      <div className="metric-value">{formatNumber(value)}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="landing">
      {/* <header className="landing-header container">
        <Link href="/">
          <div className="brand">
            <img src="/src/assets/images/logo.png" width={50} height={50} alt="" />
            <span className="brand-text">EcoMarket</span>
          </div>
        </Link>

        <nav className="nav">
        <a href="#how">Как это работает</a>
          <a href="#benefits">Преимущества</a>
          <a href="#contacts">Контакты</a>
          <a href="/login">
            <button className="btn btn-ghost" type="button">
              Войти
            </button>
          </a>
        </nav>
      </header> */}

      <main style={{marginTop: "70px"}} className="container hero" role="main">
        <section className="hero-left">
          <h1 className="title">Отдавайте ненужные вещи бесплатно — дайте им вторую жизнь</h1>
          <p className="subtitle">
            Локальная площадка обмена вещами: экологично, просто и бесплатно. Сэкономьте ресурсы и помогите соседям.
          </p>

          <div className="hero-ctas">
            <Link to="/login">
              <button className="btn btn-primary">Оставить объявление</button>
            </Link>
            <Link to="/categories/technical">
              <button className="btn btn-secondary">Посмотреть вещи</button>
            </Link>
          </div>

          <div className="metrics">
            <Metric end={12482} label="Предметов спасено" />
            <div className="divider" />
            <Metric end={3980} label="Активных пользователей" />
            <div className="divider" />
            <Metric end={120} label="Тонн отходов эквивалента" />
          </div>
        </section>

        <aside className="hero-right" aria-hidden="true">
          {/* Чистая иконография — стилизованная карточка */}
          <div className="card-illustration">
            <svg viewBox="0 0 120 120" className="illustration-svg" aria-hidden="true">
              <rect x="0" y="0" width="120" height="120" rx="18" fill="var(--card-bg)" />
              <g
                transform="translate(18,18)"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 48c8 0 14-6 20-6s12 6 20 6" opacity="0.06" />
                <path d="M36 10c6 0 18 8 18 18s-10 18-18 18S18 36 18 26 30 10 36 10z" fill="var(--accent)" />
                <path d="M6 40c8 6 18 12 36 12 8 0 18-4 30-12" opacity="0.12" />
              </g>
            </svg>
          </div>
        </aside>
      </main>

      <section id="how" className="container how">
        <h2 className="section-title">Как это работает</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="var(--glass)" />
                <path d="M8 12h8" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <h3>1. Разместите объявление</h3>
            <p>Быстро опишите вещь, загрузите фото и укажите район — всё бесплатно.</p>
          </div>

          <div className="step">
            <div className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="1" y="1" width="22" height="22" rx="4" fill="var(--glass)" />
                <path d="M6 12h12" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <h3>2. Договоритесь о встрече</h3>
            <p>Чат внутри приложения — безопасно и удобно. Встречи в нейтральных местах.</p>
          </div>

          <div className="step">
            <div className="step-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="1" y="1" width="22" height="22" rx="4" fill="var(--glass)" />
                <path d="M12 6v12" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <h3>3. Дайте вещам новую жизнь</h3>
            <p>Вы помогаете уменьшить количество отходов и поддержать сообщество.</p>
          </div>
        </div>
      </section>

      <section id="benefits" className="container benefits">
        <h2 className="section-title">Почему это важно</h2>
        <ul className="benefit-list">
          <li>Экономия ресурсов и сокращение отходов.</li>
          <li>Поддержка местного сообщества и взаимопомощь.</li>
          <li>Простая и честная система — вещи бесплатно, без посредников.</li>
        </ul>
      </section>

      <footer id="contacts" className="container footer">
        <div className="footer-left">
          <div className="brand small">
            <svg className="logo" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
              <rect width="64" height="64" rx="12" fill="var(--glass)" />
              <g transform="translate(8,8)">
                <path d="M22 24c6-1 10-6 10-12 0-6-5-11-11-11-6 0-11 5-11 11 0 6 4 11 10 12v6h2v-6z" fill="var(--accent)" />
              </g>
            </svg>
            <span className="brand-text">EcoMarket</span>
          </div>
          <p className="muted">© {new Date().getFullYear()} EcoMarket — сделано для хакатона. Контакты: kayumovmuhamma@gmail.com</p>
        </div>

        <div className="footer-right">
          <Link className="link" to="#how">
            Как это работает
          </Link>
          <Link className="link" to="#benefits">
            Преимущества
          </Link>
        </div>
      </footer>
    </div>
  );
}
