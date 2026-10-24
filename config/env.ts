import dotenv from 'dotenv';
import path from 'path';

// Charge le .env s'il existe (en local). En CI, les variables sont injectées par Jenkins.
dotenv.config({ path: path.resolve(__dirname, '../.env'), quiet: true });

export const BASE_URL = process.env.BASE_URL || 'https://practicesoftwaretesting.com';
export const API_URL = process.env.API_URL || 'https://api.practicesoftwaretesting.com';

export type Credentials = {
  email: string;
  password: string;
};

/**
 * Lit une variable d'environnement obligatoire.
 * Lève une erreur explicite si elle est absente, plutôt que de lancer un test avec un identifiant vide.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variable d'environnement manquante : ${name}. ` +
      `Copier .env.example en .env et la renseigner (en local), ou la déclarer dans Jenkins (en CI).`
    );
  }
  return value;
}

// Fonctions (et non constantes) : l'erreur n'est levée que par les tests qui ont besoin des identifiants.
export function getCustomerCredentials(): Credentials {
  return {
    email: requireEnv('CUSTOMER_EMAIL'),
    password: requireEnv('CUSTOMER_PASSWORD'),
  };
}

export function getAdminCredentials(): Credentials {
  return {
    email: requireEnv('ADMIN_EMAIL'),
    password: requireEnv('ADMIN_PASSWORD'),
  };
}
