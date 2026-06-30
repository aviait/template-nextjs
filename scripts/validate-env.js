#!/usr/bin/env node
// Valida variáveis de ambiente obrigatórias na inicialização
const required = [
  {
    key: 'DATABASE_URL',
    validate: (v) => v.startsWith('postgresql://'),
    hint: 'deve ser uma URL PostgreSQL válida',
  },
  { key: 'SESSION_SECRET', validate: (v) => v.length >= 32, hint: 'deve ter ao menos 32 caracteres' },
  { key: 'ADMIN_PASSWORD', validate: (v) => v.length > 0, hint: 'não pode estar vazio' },
];

let failed = false;
for (const { key, validate, hint } of required) {
  const value = process.env[key];
  if (!value || !validate(value)) {
    console.error(`[env] ${key} inválido — ${hint}`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log('[env] todas as variáveis obrigatórias estão válidas');
