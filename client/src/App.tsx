import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import MealPlan from "./pages/MealPlan";
import Calculator from "./pages/Calculator";
import HealthTips from "./pages/HealthTips";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/membros" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/plano" component={MealPlan} />
      <Route path="/calculadora" component={Calculator} />
      <Route path="/dicas" component={HealthTips} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
