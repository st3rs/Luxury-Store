export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export interface PaymentProvider {
  name: string;
  createSession: (amount: number, currency: string) => Promise<any>;
  processPayment: (data: any) => Promise<PaymentResult>;
}

class StripeProvider implements PaymentProvider {
  name = 'stripe';
  async createSession(amount: number, currency: string) {
    // Mock Stripe session creation
    return { sessionId: 'st_' + Math.random().toString(36).substr(2, 9) };
  }
  async processPayment(data: any) {
    return { success: true, transactionId: 'ch_' + Math.random().toString(36).substr(2, 9) };
  }
}

class PayPalProvider implements PaymentProvider {
  name = 'paypal';
  async createSession(amount: number, currency: string) {
    // Mock PayPal order creation
    return { orderId: 'pp_' + Math.random().toString(36).substr(2, 9) };
  }
  async processPayment(data: any) {
    return { success: true, transactionId: 'pay_' + Math.random().toString(36).substr(2, 9) };
  }
}

class ManualTransferProvider implements PaymentProvider {
  name = 'manual';
  async createSession(amount: number, currency: string) {
    return { type: 'manual', amount, currency };
  }
  async processPayment(data: any) {
    return { success: true, transactionId: 'manual_' + Date.now() };
  }
}

export const paymentService = {
  providers: {
    stripe: new StripeProvider(),
    paypal: new PayPalProvider(),
    manual: new ManualTransferProvider(),
  },
  async checkout(providerName: 'stripe' | 'paypal' | 'manual', amount: number, currency: string = 'THB') {
    const provider = this.providers[providerName];
    if (!provider) throw new Error('Provider not found');
    
    const session = await provider.createSession(amount, currency);
    // In a real app, this would redirect or open a modal
    return provider.processPayment(session);
  }
};
