import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  selectedTab: string
  setSelectedTab: (id: string) => void
} | null>(null)

function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}) {
  const [selectedTab, setSelectedTab] = React.useState<string>(defaultValue || "")

  const contextValue = React.useMemo(() => {
    return {
      selectedTab: value !== undefined ? value : selectedTab,
      setSelectedTab: (id: string) => {
        if (value === undefined) {
          setSelectedTab(id)
        }
        onValueChange?.(id)
      }
    }
  }, [value, selectedTab, onValueChange])

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  )
}

function TabsList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-muted/50 text-muted-foreground inline-flex h-12 w-full items-center justify-between rounded-lg p-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TabsTrigger({
  className,
  value,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
}) {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component")
  }

  const { selectedTab, setSelectedTab } = context
  const isSelected = selectedTab === value

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 min-w-0",
        isSelected
          ? "bg-background text-foreground shadow-sm border border-border/30"
          : "hover:bg-muted hover:text-foreground",
        className
      )}
      onClick={() => setSelectedTab(value)}
      {...props}
    >
      {children}
    </button>
  )
}

function TabsContent({
  className,
  value,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value: string
}) {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component")
  }

  const { selectedTab } = context
  const isSelected = selectedTab === value

  if (!isSelected) {
    return null
  }

  return (
    <div
      className={cn("mt-4 pt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
