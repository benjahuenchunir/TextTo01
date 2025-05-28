export default function Footer() {
  return (
    <div className="flex flex-row justify-evenly items-center mt-6 mx-6 h-20 border-t border-t-slate-300">
      <span className="text-xs text-slate-300">
        {'2023 - '}
        <a href="https://github.com/NachoJuanDev">@NachoJuanDev</a>
      </span>

      <div className="text-xs text-slate-300">
        {'Check the repo at GitHub: '}
        <a href="https://github.com/NachoJuanDev/TextTo01">TextTo01</a>
      </div>
    </div>
  )
}
