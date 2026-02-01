# Move Wellness - TODO

## Integração Mercado Pago

### Fase 1: Configuração ✅
- [x] Validar credenciais do Mercado Pago
- [x] Criar serviço de integração com Mercado Pago
- [x] Criar rotas de API para checkout e webhook
- [x] Criar página de acesso (código vs pagamento)
- [x] Criar hook para verificar acesso do usuário
- [x] Atualizar ProtectedRoute para verificar acesso
- [x] Adicionar rota /access-gate no App.tsx

### Fase 2: Banco de Dados (Próximo)
- [ ] Criar tabela `user_access` no Supabase
- [ ] Criar tabela `access_codes` no Supabase
- [ ] Adicionar índices nas tabelas
- [ ] Testar conexão com Supabase

### Fase 3: Implementação Frontend
- [ ] Integrar Mercado Pago SDK no frontend
- [ ] Testar fluxo de código gratuito
- [ ] Testar fluxo de pagamento
- [ ] Adicionar páginas de sucesso/erro de pagamento

### Fase 4: Webhook e Confirmação
- [ ] Implementar webhook do Mercado Pago
- [ ] Testar notificações de pagamento
- [ ] Validar acesso após pagamento confirmado

### Fase 5: Testes
- [ ] Testar fluxo completo de acesso gratuito
- [ ] Testar fluxo completo de pagamento
- [ ] Testar expiração de acesso
- [ ] Testar renovação de assinatura

### Fase 6: Proteção de Rotas
- [ ] Proteger rota /membros com ProtectedRoute
- [ ] Proteger rota /plano com ProtectedRoute
- [ ] Proteger rota /calculadora com ProtectedRoute
- [ ] Proteger rota /dicas com ProtectedRoute

## Funcionalidades Existentes
- [x] Landing page com copy wellness-focused
- [x] Autenticação com Supabase
- [x] Catálogo de 50+ receitas
- [x] Filtros de receitas
- [x] Calculadora de calorias
- [x] Plano alimentar
- [x] Dicas de saúde
- [x] Domínio customizado: receitas.movenutrition.com.br
