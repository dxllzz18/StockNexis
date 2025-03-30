"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        accountSettings: {
            name: "",
            email: "",
            phone: "",
            companyName: "Your Company",
            role: "Administrator"
        },
        notificationSettings: {
            emailAlerts: true,
            stockAlerts: true,
            orderNotifications: true,
            marketingEmails: false,
            securityAlerts: true
        },
        appearanceSettings: {
            theme: "light",
            compactMode: false,
            highContrast: false
        },
        integrationSettings: {
            shopify: false,
            amazon: true,
            quickbooks: true,
            stripe: true,
            paypal: false
        }
    });
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem("user");
        if (!userData) {
            router.push("/login");
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            // Update settings with user data
            setSettings(prev => ({
                ...prev,
                accountSettings: {
                    ...prev.accountSettings,
                    name: parsedUser.name || "",
                    email: parsedUser.email || ""
                }
            }));
            setLoading(false);
        } catch (error) {
            console.error("Error parsing user data:", error);
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };

    const handleInputChange = (section, field, value) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleToggleChange = (section, field) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: !prev[section][field]
            }
        }));
    };

    const handleSaveSettings = (e) => {
        e.preventDefault();
        // Here you would send the updated settings to your backend API
        // For now, we'll just show a success message
        alert("Settings saved successfully!");

        // Update user data in localStorage
        if (user) {
            const updatedUser = {
                ...user,
                name: settings.accountSettings.name,
                email: settings.accountSettings.email
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-semibold italic">Stock<span className="font-bold">Nexis</span></h1>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href="/dashboard"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/profile"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/analytics"
                                    className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Analytics
                                </Link>
                                <Link
                                    href="/settings"
                                    className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Settings
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Settings</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Manage your account preferences, notifications, and integrations.
                            </p>
                        </div>

                        {/* Settings Navigation */}
                        <div className="mt-6 px-4 sm:px-0">
                            <nav className="space-y-1">
                                <a href="#account" className="bg-gray-100 text-gray-900 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                                    Account
                                </a>
                                <a href="#notifications" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                                    Notifications
                                </a>
                                <a href="#appearance" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                                    Appearance
                                </a>
                                <a href="#integrations" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group rounded-md px-3 py-2 flex items-center text-sm font-medium">
                                    Integrations
                                </a>
                            </nav>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSaveSettings}>
                            {/* Account Settings */}
                            <div id="account" className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
                                        <p className="mt-1 text-sm text-gray-500">Update your account details and preferences.</p>
                                    </div>

                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={settings.accountSettings.name}
                                                onChange={(e) => handleInputChange('accountSettings', 'name', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={settings.accountSettings.email}
                                                onChange={(e) => handleInputChange('accountSettings', 'email', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                id="phone"
                                                value={settings.accountSettings.phone}
                                                onChange={(e) => handleInputChange('accountSettings', 'phone', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                id="companyName"
                                                value={settings.accountSettings.companyName}
                                                onChange={(e) => handleInputChange('accountSettings', 'companyName', e.target.value)}
                                                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                Role
                                            </label>
                                            <select
                                                id="role"
                                                name="role"
                                                value={settings.accountSettings.role}
                                                onChange={(e) => handleInputChange('accountSettings', 'role', e.target.value)}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            >
                                                <option>Administrator</option>
                                                <option>Manager</option>
                                                <option>Inventory Specialist</option>
                                                <option>Staff</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notification Settings */}
                            <div id="notifications" className="mt-6 shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Preferences</h3>
                                        <p className="mt-1 text-sm text-gray-500">Configure which notifications you want to receive.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="emailAlerts"
                                                    name="emailAlerts"
                                                    type="checkbox"
                                                    checked={settings.notificationSettings.emailAlerts}
                                                    onChange={() => handleToggleChange('notificationSettings', 'emailAlerts')}
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="emailAlerts" className="font-medium text-gray-700">Email Alerts</label>
                                                <p className="text-gray-500">Receive important account and system alerts via email.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="stockAlerts"
                                                    name="stockAlerts"
                                                    type="checkbox"
                                                    checked={settings.notificationSettings.stockAlerts}
                                                    onChange={() => handleToggleChange('notificationSettings', 'stockAlerts')}
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="stockAlerts" className="font-medium text-gray-700">Stock Alerts</label>
                                                <p className="text-gray-500">Get notified when inventory items run low or out of stock.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="orderNotifications"
                                                    name="orderNotifications"
                                                    type="checkbox"
                                                    checked={settings.notificationSettings.orderNotifications}
                                                    onChange={() => handleToggleChange('notificationSettings', 'orderNotifications')}
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="orderNotifications" className="font-medium text-gray-700">Order Notifications</label>
                                                <p className="text-gray-500">Receive updates about new orders and order status changes.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="marketingEmails"
                                                    name="marketingEmails"
                                                    type="checkbox"
                                                    checked={settings.notificationSettings.marketingEmails}
                                                    onChange={() => handleToggleChange('notificationSettings', 'marketingEmails')}
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="marketingEmails" className="font-medium text-gray-700">Marketing Emails</label>
                                                <p className="text-gray-500">Receive news about product updates and promotional offers.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="securityAlerts"
                                                    name="securityAlerts"
                                                    type="checkbox"
                                                    checked={settings.notificationSettings.securityAlerts}
                                                    onChange={() => handleToggleChange('notificationSettings', 'securityAlerts')}
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="securityAlerts" className="font-medium text-gray-700">Security Alerts</label>
                                                <p className="text-gray-500">Get notified about important security-related events in your account.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Appearance Settings */}
                            <div id="appearance" className="mt-6 shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Appearance</h3>
                                        <p className="mt-1 text-sm text-gray-500">Customize how StockNexis looks for you.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
                                            <select
                                                id="theme"
                                                name="theme"
                                                value={settings.appearanceSettings.theme}
                                                onChange={(e) => handleInputChange('appearanceSettings', 'theme', e.target.value)}
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                            >
                                                <option value="light">Light</option>
                                                <option value="dark">Dark</option>
                                                <option value="system">System Default</option>
                                            </select>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="compactMode"
                                                    name="compactMode"
                                                    type="checkbox"
                                                    checked={settings.appearanceSettings.compactMode}
                                                    onChange={() => handleToggleChange('appearanceSettings', 'compactMode')}
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="compactMode" className="font-medium text-gray-700">Compact Mode</label>
                                                <p className="text-gray-500">Use a more compact view to fit more content on screen.</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="highContrast"
                                                    name="highContrast"
                                                    type="checkbox"
                                                    checked={settings.appearanceSettings.highContrast}
                                                    onChange={() => handleToggleChange('appearanceSettings', 'highContrast')}
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="highContrast" className="font-medium text-gray-700">High Contrast</label>
                                                <p className="text-gray-500">Increase contrast for better visibility and accessibility.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Integration Settings */}
                            <div id="integrations" className="mt-6 shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">Integrations</h3>
                                        <p className="mt-1 text-sm text-gray-500">Connect your StockNexis account with other platforms.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                                                    <span className="text-blue-600 font-bold">S</span>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-gray-700">Shopify</h3>
                                                    <p className="text-xs text-gray-500">Sync your Shopify store inventory with StockNexis</p>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.integrationSettings.shopify}
                                                        onChange={() => handleToggleChange('integrationSettings', 'shopify')}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-md flex items-center justify-center">
                                                    <span className="text-yellow-600 font-bold">A</span>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-gray-700">Amazon</h3>
                                                    <p className="text-xs text-gray-500">Connect your Amazon seller account</p>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.integrationSettings.amazon}
                                                        onChange={() => handleToggleChange('integrationSettings', 'amazon')}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-md flex items-center justify-center">
                                                    <span className="text-green-600 font-bold">Q</span>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-gray-700">QuickBooks</h3>
                                                    <p className="text-xs text-gray-500">Sync inventory transactions with QuickBooks</p>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.integrationSettings.quickbooks}
                                                        onChange={() => handleToggleChange('integrationSettings', 'quickbooks')}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-md flex items-center justify-center">
                                                    <span className="text-purple-600 font-bold">S</span>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-gray-700">Stripe</h3>
                                                    <p className="text-xs text-gray-500">Process payments via Stripe</p>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.integrationSettings.stripe}
                                                        onChange={() => handleToggleChange('integrationSettings', 'stripe')}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                                                    <span className="text-blue-600 font-bold">P</span>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-gray-700">PayPal</h3>
                                                    <p className="text-xs text-gray-500">Process payments via PayPal</p>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={settings.integrationSettings.paypal}
                                                        onChange={() => handleToggleChange('integrationSettings', 'paypal')}
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="pt-5">
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Advanced Settings Section */}
                <div className="mt-10 md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Advanced Settings</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Configure advanced options for your StockNexis experience.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                {/* Data Export */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-900">Data Management</h3>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">Export your inventory data for backup or analysis</p>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Export as CSV
                                            </button>
                                            <button
                                                type="button"
                                                className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Export as Excel
                                            </button>
                                        </div>

                                        <div className="border-t border-gray-200 pt-4">
                                            <p className="text-sm text-gray-500 mb-2">Import inventory data from external sources</p>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Import Data
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* API Access */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-md font-medium text-gray-900">API Access</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage API keys for programmatic access to your inventory data
                                    </p>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between py-3 bg-gray-50 px-3 rounded-md">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Primary API Key</p>
                                                <p className="text-sm text-gray-500">Created on Jan 15, 2025</p>
                                            </div>
                                            <div className="flex space-x-3">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    View Key
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                >
                                                    Regenerate
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Create New API Key
                                        </button>
                                    </div>
                                </div>

                                {/* Security Settings */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-md font-medium text-gray-900">Security</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Configure security options for your account
                                    </p>

                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="twoFactorAuth"
                                                    name="twoFactorAuth"
                                                    type="checkbox"
                                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="twoFactorAuth" className="font-medium text-gray-700">Enable Two-Factor Authentication</label>
                                                <p className="text-gray-500">Add an extra layer of security to your account</p>
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Change Password
                                            </button>
                                        </div>

                                        <div>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                Revoke All Sessions
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-md font-medium text-red-600">Danger Zone</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Actions that cannot be undone
                                    </p>

                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                            >
                                                Clear All Data
                                            </button>
                                            <p className="mt-1 text-xs text-gray-500">
                                                This will remove all inventory data from your account
                                            </p>
                                        </div>

                                        <div>
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                Delete Account
                                            </button>
                                            <p className="mt-1 text-xs text-gray-500">
                                                This will permanently delete your account and all associated data
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white mt-12">
                <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-gray-500">
                        &copy; 2025 StockNexis. All rights reserved.
                    </p>
                    <div className="mt-2 flex justify-center space-x-6">
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-500">
                            Contact Support
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}