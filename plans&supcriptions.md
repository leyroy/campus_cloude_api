# School Management System - Plan Management Overview

## Plan Structure & Features

### 🆓 Free Plan

**Target**: Small schools, trial users, individual teachers
**Price**: $0/month
**Student Limit**: Up to 50 students
**Features**:

- Basic student enrollment and profile management
- Simple attendance tracking
- Basic grade recording (manual entry)
- Parent-student communication portal
- Simple announcements system
- Basic reporting (attendance, grades)
- Email support only
- Data export (CSV only)
- 1 administrator account
- 30-day data retention

### 🚀 Startup Plan

**Target**: Growing schools, small-medium institutions
**Price**: $29/month
**Student Limit**: Up to 500 students
**Features**:

- Everything in Free Plan, plus:
- Advanced student management with custom fields
- Automated attendance tracking
- Gradebook with rubrics and weighted grades
- Parent portal with real-time notifications
- Class scheduling and timetable management
- Fee management and basic billing
- Library management system
- Bulk operations (import/export)
- Custom reports and analytics
- Priority email support + live chat
- Up to 5 administrator accounts
- 2-year data retention
- Mobile app access

### 💼 Pro Plan

**Target**: Large schools, multi-campus institutions
**Price**: $99/month
**Student Limit**: Unlimited students
**Features**:

- Everything in Startup Plan, plus:
- Multi-campus management
- Advanced analytics and dashboards
- Integration with external systems (LMS, payment gateways)
- Custom branding and white-labeling
- Advanced fee management with installments
- Inventory and asset management
- HR management for staff
- Advanced reporting with custom templates
- API access for third-party integrations
- Priority phone support + dedicated account manager
- Unlimited administrator accounts
- Unlimited data retention
- Advanced security features (SSO, 2FA)
- Custom workflows and automation

## Backend Implementation Architecture

### 1. Database Schema

```typescript
// Plan Configuration
interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: PlanFeature[];
  limits: PlanLimits;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PlanFeature {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  metadata?: Record<string, any>;
}

interface PlanLimits {
  maxStudents: number;
  maxAdmins: number;
  dataRetentionDays: number;
  apiCallsPerMonth?: number;
  storageGB?: number;
}

// User Subscription
interface Subscription {
  id: string;
  organizationId: string;
  planId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. Core Services

#### Plan Service

```typescript
class PlanService {
  async getAllPlans(): Promise<Plan[]>;
  async getPlanById(planId: string): Promise<Plan>;
  async createPlan(planData: CreatePlanDto): Promise<Plan>;
  async updatePlan(planId: string, updates: UpdatePlanDto): Promise<Plan>;
  async deletePlan(planId: string): Promise<void>;
  async checkFeatureAccess(planId: string, feature: string): Promise<boolean>;
}
```

#### Subscription Service

```typescript
class SubscriptionService {
  async createSubscription(orgId: string, planId: string): Promise<Subscription>;
  async upgradeSubscription(subscriptionId: string, newPlanId: string): Promise<Subscription>;
  async cancelSubscription(subscriptionId: string, immediate: boolean): Promise<Subscription>;
  async getCurrentSubscription(orgId: string): Promise<Subscription>;
  async checkSubscriptionStatus(orgId: string): Promise<boolean>;
  async handlePaymentSuccess(subscriptionId: string): Promise<void>;
  async handlePaymentFailure(subscriptionId: string): Promise<void>;
}
```

### 3. Middleware for Plan Enforcement

```typescript
// Feature access middleware
const requireFeature = (featureName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const orgId = req.user.organizationId;
    const subscription = await subscriptionService.getCurrentSubscription(orgId);

    if (!subscription || subscription.status !== 'active') {
      return res.status(403).json({ error: 'Subscription required' });
    }

    const hasAccess = await planService.checkFeatureAccess(subscription.planId, featureName);
    if (!hasAccess) {
      return res
        .status(403)
        .json({ error: `Feature ${featureName} not available in current plan` });
    }

    next();
  };
};

// Usage limit middleware
const checkLimit = (limitType: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const orgId = req.user.organizationId;
    const subscription = await subscriptionService.getCurrentSubscription(orgId);
    const plan = await planService.getPlanById(subscription.planId);

    const currentUsage = await getCurrentUsage(orgId, limitType);
    const limit = plan.limits[limitType];

    if (currentUsage >= limit) {
      return res.status(403).json({ error: `${limitType} limit exceeded` });
    }

    next();
  };
};
```

### 4. API Endpoints

```typescript
// Plan management routes
router.get('/plans', planController.getAllPlans);
router.get('/plans/:id', planController.getPlanById);
router.post('/plans', requireAdmin, planController.createPlan);
router.put('/plans/:id', requireAdmin, planController.updatePlan);

// Subscription management routes
router.get('/subscription', requireAuth, subscriptionController.getCurrentSubscription);
router.post('/subscription/upgrade', requireAuth, subscriptionController.upgradePlan);
router.post('/subscription/cancel', requireAuth, subscriptionController.cancelSubscription);

// Feature-protected routes
router.post(
  '/students',
  requireAuth,
  requireFeature('student_management'),
  checkLimit('maxStudents'),
  studentController.createStudent
);
router.get(
  '/analytics',
  requireAuth,
  requireFeature('advanced_analytics'),
  analyticsController.getAdvancedAnalytics
);
```

### 5. Plan Comparison Logic

```typescript
class PlanComparison {
  static isPlanUpgrade(currentPlanId: string, newPlanId: string): boolean {
    const planHierarchy = { free: 0, startup: 1, pro: 2 };
    return planHierarchy[newPlanId] > planHierarchy[currentPlanId];
  }

  static calculateProration(currentPlan: Plan, newPlan: Plan, daysRemaining: number): number {
    const currentDailyRate = currentPlan.price / 30;
    const newDailyRate = newPlan.price / 30;
    return (newDailyRate - currentDailyRate) * daysRemaining;
  }
}
```

## Key Implementation Considerations

### 1. Database Optimization

- Index frequently queried fields (organizationId, planId, status)
- Use database constraints to enforce limits
- Implement soft deletes for audit trails

### 2. Caching Strategy

- Cache plan configurations (Redis)
- Cache subscription status for quick access
- Implement cache invalidation on plan changes

### 3. Billing Integration

- Integrate with Stripe/PayPal for payment processing
- Handle webhooks for subscription events
- Implement retry logic for failed payments

### 4. Security Measures

- Validate all plan changes server-side
- Implement rate limiting on plan-sensitive endpoints
- Log all subscription changes for audit

### 5. Monitoring & Analytics

- Track feature usage by plan
- Monitor subscription churn rates
- Set up alerts for payment failures

### 6. Migration Strategy

- Plan upgrade/downgrade workflows
- Data migration for plan changes
- Graceful handling of plan downgrades

This architecture provides a robust foundation for managing multi-tier subscriptions while maintaining flexibility for future plan modifications and feature additions.
