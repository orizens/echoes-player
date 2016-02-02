export class Scroller {

	constructor($window, $interval, $elementRef, infiniteScrollCallback, infiniteScrollDistance, infiniteScrollParent) {
		let THROTTLE_MILLISECONDS = 300;
		this.windowElement = $window;
		this.scrollDistance = null;
		this.scrollEnabled = null;
		this.checkWhenEnabled = null;
		this.container = null;
		this.immediateCheck = true;
		this.useDocumentBottom = false;
		this.unregisterEventListener = null;
		this.checkInterval = false;
		this.infiniteScrollCallback = infiniteScrollCallback;
		this.$interval = $interval;
		this.$elementRef = $elementRef;

		if (THROTTLE_MILLISECONDS != null) {
			this.handler = this.throttle(this.handler, THROTTLE_MILLISECONDS);
		}
		this.handleInfiniteScrollDistance(infiniteScrollDistance);

		// if (attrs.infiniteScrollParent != null) {
		// 	changeContainer(angular.element(elem.parent()));
		// }
		// if (attrs.infiniteScrollImmediateCheck != null) {
		// 	immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
		// }
		let _self = this;
		this.handleInfiniteScrollDisabled(false);
		this.changeContainer(_self.windowElement);
		this.checkInterval = setInterval((function() {
			if (_self.immediateCheck) {
				return _self.handler();
			}
		}), 0);
	}

	height (elem) {
		// elem = elem.nativeElement;
		if (isNaN(elem.offsetHeight)) {
			return elem.document.documentElement.clientHeight;
		} else {
			return elem.offsetHeight;
		}
	}

	offsetTop (elem) {
		// elem = elem.nativeElement;
		if (!elem.getBoundingClientRect) { // || elem.css('none')) {
			return;
		}
		return elem.getBoundingClientRect().top + this.pageYOffset(elem);
	}

	pageYOffset (elem) {
		// elem = elem.nativeElement;
		if (isNaN(window.pageYOffset)) {
			return elem.document.documentElement.scrollTop;
		} else {
			return elem.ownerDocument.defaultView.pageYOffset;
		}
	}

	handler () {
		var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
		if (this.container === this.windowElement) {
			containerBottom = this.height(this.container) + this.pageYOffset(this.container.document.documentElement);
			elementBottom = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
		} else {
			containerBottom = this.height(this.container);
			containerTopOffset = 0;
			if (this.offsetTop(this.container) !== void 0) {
				containerTopOffset = this.offsetTop(this.container);
			}
			elementBottom = this.offsetTop(this.$elementRef.nativeElement) - containerTopOffset + this.height(this.$elementRef.nativeElement);
		}
		if (this.useDocumentBottom) {
			elementBottom = height((this.$elementRef.nativeElement.ownerDocument || this.$elementRef.nativeElement.document).documentElement);
		}
		remaining = elementBottom - containerBottom;
		shouldScroll = remaining <= this.height(this.container) * this.scrollDistance + 1;
		if (shouldScroll) {
			this.checkWhenEnabled = true;
			if (this.scrollEnabled) {
				// if (scope.$$phase || $rootScope.$$phase) {
				// 	return scope.infiniteScroll();
				// } else {
				// 	return scope.$apply(scope.infiniteScroll);
				// }
				this.infiniteScrollCallback();
			}
		} else {
			if (this.checkInterval) {
				// this.$interval.cancel(this.checkInterval);
				clearInterval(this.checkInterval);
			}
			return this.checkWhenEnabled = false;
		}
	}

	throttle (func, wait) {
		var later, previous, timeout;
		var _self = this;
		timeout = null;
		previous = 0;
		later = function() {
			var context;
			previous = new Date().getTime();
			clearInterval(timeout);
			timeout = null;
			func.call(_self);
			return context = null;
		};
		return function() {
			var now, remaining;
			now = new Date().getTime();
			remaining = wait - (now - previous);
			if (remaining <= 0) {
				clearTimeout(timeout);
				clearInterval(timeout);
				timeout = null;
				previous = now;
				return func.call(_self);
			} else {
				if (!timeout) {
					return timeout = _self.$interval(later, remaining, 1);
				}
			}
		};
	}

	handleInfiniteScrollDistance (v) {
		return this.scrollDistance = parseFloat(v) || 0;
	}

	changeContainer (newContainer) {
		if (this.container != null) {
            this.container.unbind('scroll', this.handler);
		}
		this.container = newContainer;
		if (newContainer != null) {
            return this.container.addEventListener('scroll', this.handler.bind(this));
		}
	}

	handleInfiniteScrollDisabled (v) {
		this.scrollEnabled = !v;
		// if (this.scrollEnabled && checkWhenEnabled) {
		// 	checkWhenEnabled = false;
		// 	return handler();
		// }
	}
}

	// if (THROTTLE_MILLISECONDS != null) {
	// 	handler = throttle(handler, THROTTLE_MILLISECONDS);
	// }
	// scope.$on('$destroy', function() {
	// 	container.unbind('scroll', handler);
	// 	if (unregisterEventListener != null) {
	// 		unregisterEventListener();
	// 		return unregisterEventListener = null;
	// 	}
	// });
	// handleInfiniteScrollDistance = function(v) {
	// 	return scrollDistance = parseFloat(v) || 0;
	// };
	// scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
	// handleInfiniteScrollDistance(scope.infiniteScrollDistance);
	// handleInfiniteScrollDisabled = function(v) {
	// 	scrollEnabled = !v;
	// 	if (scrollEnabled && checkWhenEnabled) {
	// 		checkWhenEnabled = false;
	// 		return handler();
	// 	}
	// };
	// scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
	// handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
	// handleInfiniteScrollUseDocumentBottom = function(v) {
	// 	return useDocumentBottom = v;
	// };
	// scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
	// handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
	// changeContainer = function(newContainer) {
	// 	if (container != null) {
	// 		container.unbind('scroll', handler);
	// 	}
	// 	container = newContainer;
	// 	if (newContainer != null) {
	// 		return container.bind('scroll', handler);
	// 	}
	// };
	// changeContainer(windowElement);
	// if (scope.infiniteScrollListenForEvent) {
	// 	unregisterEventListener = $rootScope.$on(scope.infiniteScrollListenForEvent, handler);
	// }
	// handleInfiniteScrollContainer = function(newContainer) {
	// 	if ((newContainer == null) || newContainer.length === 0) {
	// 		return;
	// 	}
	// 	if (newContainer instanceof HTMLElement) {
	// 		newContainer = angular.element(newContainer);
	// 	} else if (typeof newContainer.append === 'function') {
	// 		newContainer = angular.element(newContainer[newContainer.length - 1]);
	// 	} else if (typeof newContainer === 'string') {
	// 		newContainer = angular.element(document.querySelector(newContainer));
	// 	}
	// 	if (newContainer != null) {
	// 		return changeContainer(newContainer);
	// 	} else {
	// 		throw new Exception("invalid infinite-scroll-container attribute.");
	// 	}
	// };
	// scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
	// handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
	// if (attrs.infiniteScrollParent != null) {
	// 	changeContainer(angular.element(elem.parent()));
	// }
	// if (attrs.infiniteScrollImmediateCheck != null) {
	// 	immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
	// }
	// return checkInterval = $interval((function() {
	// 	if (immediateCheck) {
	// 		return handler();
	// 	}
	// }), 0);
