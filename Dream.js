/**
 * [MITM]
 * hostname = paint.api.wombo.ai, api.revenuecat.com
 * 
 * Quantumult X
 * [rewrite_local]
 * ^https?:\/\/paint\.api\.womno\.ai:443\/api\/(user|styles|premium\/sync) url script-response-body这里是js路径
 * 
 */

const SCRIPT_NAME = 'Dream';
const USER = /https?:\/\/paint\.api\.womno\.ai:443\/api\/user;
const STYLES = /https?:\/\/paint\.api\.womno\.ai:443\/api\/styles;
const PREMIUM = /https?:\/\/paint\.api\.womno\.ai:443\/api\/premium\/sync;

if ($resquest.url.indexOf(USER) ！= -1){
    let initial = JSON.parse($response.body);
    initial.user_subscriptions["is_premium"] = "true";
    initial.user_subscriptions["expires_on"] = "2099-01-01T00:00:00";
    initial["username"] = "木瞳科技Pro";
}

$done({body: JSON.stringify(initial)});
