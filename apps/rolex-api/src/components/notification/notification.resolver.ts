import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { NotificationService } from './notification.service';
import { Notification, Notifications } from '../../libs/dto/notification/notification';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { NotificationInquiry } from '../../libs/dto/notification/notification.input';
import { shapeIntoMongoObjectId } from '../../libs/config';

@Resolver(() => Notification)
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}

	@UseGuards(AuthGuard)
	@Query(() => Notifications)
	async myNotifications(
		@AuthMember('_id') memberId: ObjectId,
		@Args('input') input: NotificationInquiry,
	): Promise<Notifications> {
		return (await this.notificationService.myNotifications(memberId, input)) as any;
	}

	// Unread count badge
	@UseGuards(AuthGuard)
	@Query(() => Int)
	async unreadNotificationsCount(@AuthMember('_id') memberId: ObjectId): Promise<number> {
		return this.notificationService.unreadCount(memberId);
	}

	// Mark single notification as READ
	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	async markNotificationRead(@AuthMember('_id') memberId: ObjectId, @Args('id') id: string): Promise<Notification> {
		return this.notificationService.markRead(memberId, shapeIntoMongoObjectId(id));
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Int)
	async markAllNotificationsRead(@AuthMember('_id') memberId: ObjectId): Promise<number> {
		return this.notificationService.markAllRead(memberId);
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	async removeNotification(@Args('id') id: string): Promise<Notification> {
		return this.notificationService.removeNotification(shapeIntoMongoObjectId(id));
	}

	@UseGuards(AuthGuard)
	@Mutation(() => Boolean)
	async removeAllNotifications(@AuthMember('_id') memberId: ObjectId): Promise<boolean> {
		return this.notificationService.removeAllNotifications(memberId);
	}

	// Create a welcome notification for current user (useful for testing)
	@UseGuards(AuthGuard)
	@Mutation(() => Notification)
	async createWelcomeNotification(@AuthMember('_id') memberId: ObjectId): Promise<Notification> {
		return this.notificationService.createWelcome(memberId);
	}
}