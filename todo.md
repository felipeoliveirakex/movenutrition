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

### Fase 1.5: Design e UX ✅
- [x] Redesenhar página de login com cores da landing page
- [x] Redesenhar página de signup com cores da landing page
- [x] Melhorar página AccessGate com informações sobre planos
- [x] Adicionar informação sobre 1 mês grátis para clientes
- [x] Adicionar informação sobre plano pago de R$ 29/mês

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

### Fase 2: Experiência Pós-Login ✅
- [x] Criar WelcomeDashboard com boas-vindas personalizado
- [x] Mostrar nome do usuário na mensagem de boas-vindas
- [x] Exibir stats (50+ receitas, 7 categorias, 9 benefícios)
- [x] Criar cards de acesso rápido (Receitas, Plano, Calculadora, Dicas)
- [x] Implementar lógica de primeira visita vs retorno
- [x] Salvar status de visita no localStorage
- [x] Testes do WelcomeDashboard (13 testes passando)

### Fase 3: Página Inicial Unificada ✅
- [x] Consolidar WelcomeDashboard e receitas em uma única página
- [x] Adicionar boas-vindas personalizado com nome do usuário
- [x] Exibir sugestões de semana (4 temas diferentes)
- [x] Integrar busca e filtros na mesma página
- [x] Manter design consistente com paleta de cores (branco, preto, verde)
- [x] Adicionar header com logo e botão de logout
- [x] Implementar grid responsivo de receitas
- [x] Testes da página Home (27 testes passando)
- [x] Fluxo completo: Login → Home unificada com tudo em um lugar

### Fase 4: Banner de Benefícios e Checkout ✅
- [x] Criar banner de benefícios com 5 argumentos principais
- [x] Exibir preço R$ 29/mês com informações de pagamento
- [x] Adicionar CTA "Assinar Agora" com link para checkout
- [x] Criar página de checkout com resumo do pedido
- [x] Implementar formulário de dados de pagamento
- [x] Adicionar segurança e informações de proteção de dados
- [x] Mostrar benefícios no checkout para reforçar decisão
- [x] Integrar rota /checkout no App.tsx
- [x] Testes de banner e checkout (33 testes passando)
- [x] Design consistente com paleta de cores
