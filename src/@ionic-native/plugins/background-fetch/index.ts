import { Cordova, IonicNativePlugin, Plugin } from '@ionic-native/core';

import { Injectable } from '@angular/core';

export interface BackgroundFetchConfig {
  /**
   * The minimum interval in minutes to execute background fetch events. Defaults to 15 minutes. 
   * Note: Background-fetch events will never occur at a frequency higher than every 15 minutes. 
   * Apple uses a secret algorithm to adjust the frequency of fetch events, presumably based upon usage patterns of the app. 
   * Fetch events can occur less often than your configured minimumFetchInterval
   */
  minimumFetchInterval?: number;

  /**
   * Set false to continue background-fetch events after user terminates the app. Default to true.
   * Andorid only option. 
   */
  stopOnTerminate?: boolean;

  /**
   * Set true to initiate background-fetch events when the device is rebooted. Defaults to false.
   * Andorid only option.
   * Note: startOnBoot requires stopOnTerminate: false.
   */
  startOnBoot?: boolean;

  /**
   * Set true to automatically relaunch the application (if it was terminated) — 
   * the application will launch to the foreground then immediately minimize. Defaults to false.
   * Andorid only option. 
   */
  forceReload?: boolean;
}


/**
 * @name Background Fetch
 * @description
 * Background Fetch Implementation for iOS and Android
 * 
 * iOS Background Fetch Implementation. See: https://developer.apple.com/reference/uikit/uiapplication#1657399
 * iOS Background Fetch is basically an API which wakes up your app about every 15 minutes (during the user's prime-time hours) and provides your app exactly 30s of background running-time. This plugin will execute your provided callbackFn whenever a background-fetch event occurs. There is no way to increase the rate which a fetch-event occurs and this plugin sets the rate to the most frequent possible value of UIApplicationBackgroundFetchIntervalMinimum -- iOS determines the rate automatically based upon device usage and time-of-day (ie: fetch-rate is about ~15min during prime-time hours; less frequently when the user is presumed to be sleeping, at 3am for example).
 *
 * Android implements background fetch using two different mechanisms, depending on the Android SDK version. 
 * Where the SDK version is >= LOLLIPOP, the new JobScheduler https://developer.android.com/reference/android/app/job/JobScheduler.html API is used. 
 * Otherwise, the old AlarmManager https://developer.android.com/reference/android/app/AlarmManager.html will be used.
 * Unlike iOS, the Android implementation can continue to operate after application terminate 
 * (stopOnTerminate: false) or device reboot (startOnBoot: true).
 * 
 * For more detail, please see https://github.com/transistorsoft/cordova-plugin-background-fetch
 * 
 * @usage
 *
 * ```typescript
 * import { BackgroundFetch, BackgroundFetchConfig } from '@ionic-native/background-fetch';
 *
 *
 * constructor(private backgroundFetch: BackgroundFetch) {
 *
 *   const config: BackgroundFetchConfig = {
 *     minimumFetchInterval: 15, // <-- default is 15
 *     stopOnTerminate: false,   // <-- Android only
 *     startOnBoot: true,        // <-- Android only
 *     forceReload: true         // <-- Android only
 *   };
 *
 *   backgroundFetch.configure(config)
 *      .then(() => {
 *          console.log('Background Fetch initialized');
 *
 *          this.backgroundFetch.finish();
 *
 *      })
 *      .catch(e => console.log('Error initializing background fetch', e));
 *
 *   // Start the background-fetch API. Your callbackFn provided to #configure will be executed each time a background-fetch event occurs. NOTE the #configure method automatically calls #start. You do not have to call this method after you #configure the plugin
 *   backgroundFetch.start();
 *
 *   // Stop the background-fetch API from firing fetch events. Your callbackFn provided to #configure will no longer be executed.
 *   backgroundFetch.stop();
 *
 *
 * }
 *
 * ```
 * @interfaces
 * BackgroundFetchConfig
 *
 */
@Plugin({
  pluginName: 'BackgroundFetch',
  plugin: 'cordova-plugin-background-fetch',
  pluginRef: 'BackgroundFetch',
  repo: 'https://github.com/transistorsoft/cordova-plugin-background-fetch',
  platforms: ['Android', 'iOS']
})
@Injectable()
export class BackgroundFetch extends IonicNativePlugin {


  /**
   * Configures the plugin's fetch callbackFn
   *
   * @param {BackgroundFetchConfig} config Configuration for plugin
   * @return {Promise<any>}
   */
  @Cordova({
    callbackOrder: 'reverse'
  })
  configure(config: BackgroundFetchConfig): Promise<any> { return; }

  /**
   * Start the background-fetch API.
   * Your callbackFn provided to #configure will be executed each time a background-fetch event occurs. NOTE the #configure method automatically calls #start. You do not have to call this method after you #configure the plugin
   * @returns {Promise<any>}
   */
  @Cordova()
  start(): Promise<any> { return; }

  /**
   * Stop the background-fetch API from firing fetch events. Your callbackFn provided to #configure will no longer be executed.
   * @returns {Promise<any>}
   */
  @Cordova()
  stop(): Promise<any> { return; }

  /**
   * You MUST call this method in your fetch callbackFn provided to #configure in order to signal to iOS that your fetch action is complete. iOS provides only 30s of background-time for a fetch-event -- if you exceed this 30s, iOS will kill your app.
   */
  @Cordova({
    sync: true
  })
  finish(): void { }

  /**
   * Return the status of the background-fetch
   * @returns {Promise<any>}
   */
  @Cordova()
  status(): Promise<any> { return; }

}
