
/*
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}
*/


          

// src/types/index.ts    : changement pour faire la cnx avec le backend

// NOUVELLE Interface pour les catégories (correspond à Categorie.java)
export interface Category {
  id: number;       // Correspond à Long ID
  nom: string;      // Correspond à String nom
  description?: string; // Correspond à String description (optionnel)
}

// Interface Produit MISE À JOUR
export interface Product {
  id: number;           // Correspond à Long id (transmis comme number)
  nom: string;          // Correspond à String nom
  description: string;  // Correspond à String description
  prix: number;         // Correspond à BigDecimal prix (transmis comme number)
  quantiteStock: number;// Correspond à int quantiteStock
  imageUrl: string;     // Correspond à String imageUrl (RENOMMÉ de 'image')
  rating?: number;      // Correspond à BigDecimal rating (optionnel, transmis comme number)
  featured: boolean;    // Correspond à boolean featured
  categorie: Category;  // Correspond à l'objet Categorie imbriqué (MODIFIÉ de 'string')
  // avis?: any[]; // Décommentez si vous gérez les avis et définissez une interface Avis
}

// Interface CartItem (utilise Product, donc mise à jour implicitement)
// Vous pouvez la garder telle quelle SI elle utilise la nouvelle interface Product.
// Si elle stockait des champs spécifiques, vérifiez la compatibilité.
export interface CartItem {
  product: Product; // Assurez-vous que c'est bien la NOUVELLE interface Product
  quantity: number;
}

// Interface User (vérifiez la cohérence avec le contenu de votre JWT)
// Ce que nous avons mis dans le token : 'sub' (email), 'roles' (List<String>)
// Ce que AuthContext essaie d'extraire : 'sub', 'userId', 'role', 'name'
// Adaptons pour mieux correspondre au token actuel :
export interface User {
  id?: string | number; 
  nom: string,
  role?:string,
  prenom: string,
  email: string,
  telephone: string,
  password: string    
   // Provient de la claim 'roles' (une liste/set de strings)
}
// Note : Vous devrez peut-être adapter AuthContext pour gérer `roles: string[]` au lieu de `role: string`

// Interface Order (pas directement affectée pour l'instant) a supprimé après ne sert à rien
export interface Order {
  id: string; // Ou number selon votre backend
  userId: string; // Ou number
  items: CartItem[]; // Utilise CartItem, qui utilise Product (indirectement affecté)
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered'; // Ou les statuts de votre backend
  createdAt: string; // Ou Date
}




// des ajouts à vraiment vérifier :

// ajout de l'interface comande :

export interface Commande {
  id: number; // Correspond à Long id
  client?: User; // Référence à l'utilisateur (peut être juste l'ID ou l'objet User simplifié si le backend ne renvoie pas tout)
  dateCommande: string; // LocalDateTime est souvent sérialisé en String ISO 8601
  statut: 'PENDING_PAYMENT' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'FAILED' | string; // Utiliser les statuts de l'Enum ou string pour flexibilité
  lignesCommande: LigneCommande[]; // Tableau des lignes de commande
  paiement?: Paiement; // Référence au paiement (peut être null initialement)
  livreur?: User; // Référence au livreur (peut être null)
  // Optionnel: Ajouter le total calculé si le backend le renvoie
  totalCommande?: number;
}


// Correspond à LigneCommande.java
export interface LigneCommande {
  id: number; // Correspond à Long id
  // commande?: Commande; // On évite la référence circulaire ici généralement
  produit: Product; // Référence à l'objet Produit complet (ou juste l'ID si le backend ne renvoie que ça)
  quantite: number; // Correspond à int quantite
  prixUnitaire: number; // Correspond à BigDecimal prixUnitaire
}

// --- NOUVELLE Interface Paiement ---
// Correspond à Paiement.java (si jamais vous la retournez avec la commande)
export interface Paiement {
    id: number;
    // commande?: Commande; // Éviter référence circulaire
    datePaiement: string; // LocalDateTime est souvent sérialisé en String ISO 8601
    moyenPaiement?: string;
    transactionId?: string; // ID de session Stripe par exemple
    valide: boolean;
}


// ajouter pour add delete update product : 

export interface ProductPayload {
  nom: string;
  description: string;
  prix: number;
  quantiteStock: number;
  imageUrl: string;
  rating?: number; // Rendre optionnel si non toujours fourni
  featured: boolean;
  categorie: { id: number }; // SEULEMENT l'ID de catégorie
  // Ne pas inclure 'avis' si non géré par le formulaire
}

