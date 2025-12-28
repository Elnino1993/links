"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ExternalLink, CheckCircle2, Smartphone } from "lucide-react"

export default function LandingPage() {
  const [isTelegramBrowser, setIsTelegramBrowser] = useState(false)
  const [copied, setCopied] = useState(false)

  // Ссылка, которую нужно открыть во внешнем браузере
  const targetUrl = "https://example.com"

  useEffect(() => {
    // Проверка, открыт ли сайт во встроенном браузере Telegram
    const userAgent = navigator.userAgent || navigator.vendor
    setIsTelegramBrowser(userAgent.includes("Telegram"))
  }, [])

  const openInExternalBrowser = () => {
    if (typeof window !== "undefined") {
      // Для Telegram Web App API
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openLink(targetUrl)
      }
      // Альтернативный метод - открытие ссылки с target="_blank"
      else {
        const link = document.createElement("a")
        link.href = targetUrl
        link.target = "_blank"
        link.rel = "noopener noreferrer"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Smartphone className="h-4 w-4" />
            {isTelegramBrowser ? "Обнаружен Telegram браузер" : "Оптимизировано для мобильных устройств"}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Открой ссылку в<span className="block mt-2">полноценном браузере</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Для лучшего опыта работы рекомендуем открыть наш сайт в стандартном браузере вашего устройства вместо
            встроенного браузера Telegram.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={openInExternalBrowser} className="w-full sm:w-auto text-base px-8 py-6">
              <ExternalLink className="mr-2 h-5 w-5" />
              Открыть в браузере
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={copyLink}
              className="w-full sm:w-auto text-base px-8 py-6 bg-transparent"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Скопировано!
                </>
              ) : (
                "Копировать ссылку"
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Почему стоит открыть в браузере?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Полная функциональность</h3>
              <p className="text-muted-foreground text-sm">
                Все функции сайта работают корректно в полноценном браузере без ограничений.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
              <p className="text-muted-foreground text-sm">
                Стандартный браузер обеспечивает лучшую защиту ваших данных и приватности.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Лучший опыт</h3>
              <p className="text-muted-foreground text-sm">
                Наслаждайтесь всеми возможностями современного веб-приложения.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <Card className="max-w-3xl mx-auto p-8 bg-muted/30">
          <h3 className="text-xl font-semibold mb-4">Как открыть в браузере?</h3>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </span>
              <span>Нажмите на кнопку &ldquo;Открыть в браузере&rdquo; выше</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </span>
              <span>Выберите ваш предпочитаемый браузер (Chrome, Safari, Firefox и т.д.)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                3
              </span>
              <span>Наслаждайтесь полным функционалом сайта!</span>
            </li>
          </ol>
        </Card>
      </section>
    </main>
  )
}
