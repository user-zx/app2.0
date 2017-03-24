package com.jqyq;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.theweflex.react.WeChatPackage;
import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "JQYQ";
    }
    /**
    *.别动这块代码,可能出问题
    */
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage()
            , new WeChatPackage()        // Add this line
        );
    }
}
