import { PrayerJournal } from "./prayerjournal";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <PrayerJournal />
      <div className="footer">
        <p>
          This app is built by{" "}
          <a
            href="https://www.mjhdesignstudio.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            MJH Design Studio
          </a>
        </p>
      </div>
    </div>
  );
}
