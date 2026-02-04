import './App.css'

function shortSha(sha) {
  if (!sha) return 'local'
  return sha.slice(0, 7)
}

export default function App() {
  const sha = import.meta.env.VITE_GIT_SHA
  const buildTime = import.meta.env.VITE_BUILD_TIME

  return (
    <div className="app">
      <h1>AWS CI/CD React</h1>
      <p>This app is deployed from GitHub Actions to an EC2 instance.</p>

      <div className="meta">
        <div>
          <span>Commit</span>
          <code>{shortSha(sha)}</code>
        </div>
        <div>
          <span>Build time</span>
          <code>{buildTime || 'local'}</code>
        </div>
      </div>

      <ol>
        <li>
          Edit <code>src/App.jsx</code> and push to <code>main</code>.
        </li>
        <li>
          GitHub Actions builds and rsyncs <code>dist/</code> to EC2.
        </li>
        <li>Refresh this page to confirm the new commit is deployed.</li>
      </ol>
    </div>
  )
}

